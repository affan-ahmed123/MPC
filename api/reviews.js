import { MongoClient } from 'mongodb';

let cachedClient = null;
let cachedDb = null;

async function getDatabase(uri) {
  if (cachedDb) return cachedDb;
  const mongoUri = uri || process.env.MONGODB_URI;
  if (!mongoUri || !mongoUri.trim() || mongoUri.includes('<username>') || mongoUri.includes('<password>')) {
    return null;
  }
  
  try {
    const client = new MongoClient(mongoUri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    });
    await client.connect();
    const db = client.db('mpc_restaurant');
    cachedClient = client;
    cachedDb = db;
    return db;
  } catch (err) {
    console.error('MongoDB Atlas Connection Error:', err.message);
    return null;
  }
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

  // Ensure helper methods exist if running in Connect/Vite middleware
  if (!res.status) {
    res.status = (code) => {
      res.statusCode = code;
      return res;
    };
  }
  if (!res.json) {
    res.json = (data) => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(data));
      return res;
    };
  }

  try {
    const db = await getDatabase();

    // GET /api/reviews -> Return reviews
    if (req.method === 'GET') {
      if (!db) {
        return res.status(200).json({
          success: true,
          reviews: [],
          fromDb: false,
          message: 'MongoDB Atlas not connected. Set MONGODB_URI in .env to persist to database.'
        });
      }

      const reviews = await db
        .collection('reviews')
        .find({})
        .sort({ createdAt: -1 })
        .limit(50)
        .toArray();

      return res.status(200).json({
        success: true,
        reviews,
        fromDb: true
      });
    }

    // POST /api/reviews -> Save new review
    if (req.method === 'POST') {
      let body = req.body;
      if (typeof body === 'string') {
        try {
          body = JSON.parse(body);
        } catch {
          body = {};
        }
      }

      const { name, rating, comment, role } = body || {};

      if (!name || !name.trim()) {
        return res.status(400).json({ success: false, error: 'Name is required' });
      }
      if (!comment || !comment.trim()) {
        return res.status(400).json({ success: false, error: 'Review comment is required' });
      }

      const newReview = {
        name: name.trim().slice(0, 60),
        rating: Math.min(5, Math.max(1, Number(rating) || 5)),
        comment: comment.trim().slice(0, 1000),
        role: role && role.trim() ? role.trim().slice(0, 40) : 'Verified Customer',
        date: 'Just now',
        createdAt: new Date().toISOString()
      };

      if (!db) {
        // Fallback when MongoDB is not connected yet
        return res.status(200).json({
          success: true,
          review: {
            ...newReview,
            _id: 'local_' + Date.now()
          },
          fromDb: false,
          message: 'Review saved locally! Add MONGODB_URI in .env to save permanently to MongoDB Atlas.'
        });
      }

      const insertResult = await db.collection('reviews').insertOne({
        ...newReview,
        createdAtDate: new Date()
      });

      return res.status(201).json({
        success: true,
        review: {
          ...newReview,
          _id: insertResult.insertedId
        },
        fromDb: true
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API Error:', err);
    return res.status(500).json({
      success: false,
      error: err.message || 'Server error'
    });
  }
}


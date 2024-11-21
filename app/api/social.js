// pages/api/social.js
import SocialMedia from '../models/SocialMedia';
import dbConnect from '../lib/dbConnect';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const links = await SocialMedia.find();
    return res.json(links);
  }

  if (req.method === 'POST') {
    const { platform, url } = req.body;
    const link = new SocialMedia({ platform, url });
    await link.save();
    return res.status(201).json(link);
  }
  switch (method) {
    case 'PUT':
      try {
        const product = await Product.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        res.status(200).json({ success: true, data: product });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        await Product.deleteOne({ _id: id });
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
  // Add DELETE and PUT methods as needed for editing and deleting
}

// models/SocialMedia.js
import mongoose from 'mongoose';

const socialMediaSchema = new mongoose.Schema({
  platform: String, // e.g., Instagram, Facebook
  url: String, // the social media URL
});

export default mongoose.models.SocialMedia || mongoose.model('SocialMedia', socialMediaSchema);

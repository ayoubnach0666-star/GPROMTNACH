
import { AIPrompt, PromptCategory } from './types';

export const MOCK_PROMPTS: AIPrompt[] = [
  {
    id: '1',
    title: 'Cyberpunk Sneaker Concept',
    description: 'High-end footwear with integrated LED strips and transparent soles.',
    shortPreview: 'Futuristic sneaker, neon purple accents, techwear style...',
    prompt: 'Professional product photography of a futuristic cyberpunk sneaker, floating in mid-air, integrated purple LED strips, transparent gel soles, carbon fiber textures, dark tech background, cinematic lighting, 8k resolution, ultra-detailed.',
    imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800&h=1000',
    category: PromptCategory.PRODUCT,
    author: 'DesignBot',
    date: '2024-05-25',
    tips: ['Works best with "Dark Mode" lighting keywords', 'Specify material types for better textures']
  },
  {
    id: '5',
    title: 'Ethereal Mountain Landscape',
    description: 'Breathtaking high-altitude peak at sunrise with mist layers.',
    shortPreview: 'Majestic mountains, morning mist, golden hour light...',
    prompt: 'Breathtaking wide-angle landscape photograph of snow-capped Himalayan peaks at sunrise, dense layers of valley mist, warm golden hour sunlight hitting the summits, cold blue shadows, hyper-realistic, shot on Phase One XF, 100MP, sharp focus, cinematic atmosphere.',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800&h=1000',
    category: PromptCategory.PHOTOGRAPHS,
    author: 'NatureLens',
    date: '2024-05-26',
    tips: ['Mention specific camera models for metadata simulation', 'Specify time of day for precise lighting']
  },
  {
    id: '2',
    title: 'Minimalist Tech Logo',
    description: 'A clean, geometric logo for a next-gen software company.',
    shortPreview: 'Geometric S shape, gradient purple, white background...',
    prompt: 'Vector logo design of a minimalist geometric letter S, interlocking shapes, gradient from deep purple to neon blue, flat design, white background, professional branding style, symmetrical, clean lines.',
    imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800&h=1000',
    category: PromptCategory.LOGO,
    author: 'BrandMaster',
    date: '2024-05-24',
    tips: ['Keep descriptors simple for vector-like results', 'Mention "flat design" to avoid 3D shadowing']
  },
  {
    id: '3',
    title: 'Vogue Tech-Noir Fashion',
    description: 'Editorial shot of high-fashion streetwear in a rainy alley.',
    shortPreview: 'Cyberpunk model, oversized jacket, rainy neon streets...',
    prompt: 'Editorial fashion photography, model wearing oversized iridescent techwear jacket, transparent visor, standing in a rainy Tokyo alley at night, neon purple and green reflections, high contrast, cinematic grain, Vogue style.',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800&h=1000',
    category: PromptCategory.FASHION,
    author: 'StyleAI',
    date: '2024-05-23',
    tips: ['Use "Editorial photography" for high-end lighting', 'Iridescent materials react well to lighting colors']
  },
  {
    id: '4',
    title: 'Cybernetic Portrait',
    description: 'Intimate close-up of a human with subtle digital enhancements.',
    shortPreview: 'Portrait of woman, glowing blue eyes, chrome skin patches...',
    prompt: 'Close-up portrait of a woman with bioluminescent blue eyes, small chrome cybernetic patches on cheekbones, soft volumetric lighting, deep shadows, hyper-realistic skin texture, depth of field, 8k.',
    imageUrl: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=800&h=1000',
    category: PromptCategory.PORTRAIT,
    author: 'Humanoid',
    date: '2024-05-22',
    tips: ['Mention "Hyper-realistic skin texture" for close-ups', 'Soft volumetric lighting prevents harsh edges']
  }
];

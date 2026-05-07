# **App Name**: Amity

## Core Features:

- Secure User Authentication & Onboarding: Allows users to sign up and log in via email or magic link, supporting anonymous identity. Includes an emotional onboarding flow to capture initial user mood and preferences.
- Personalized Dashboard: A dynamic dashboard displaying a user's mood check-in, previews of safe forums, and highlights of 'Glimmer' activity in a responsive layout.
- Moderated Forums and Posts: Users can browse and post content within categorized forums, interact with posts (e.g., 'warmth' meter), with sensitive content blurred by default, all managed securely by Supabase.
- AI Empathy Gate Tool for Onboarding: A generative AI tool powered by Gemini API that analyzes text submitted during user onboarding to detect harmful intent or emotional urgency, guiding users towards a safer and more supportive environment.
- AI Real-time Vibe Guard Moderation Tool: A generative AI tool powered by Gemini API that performs real-time content moderation on user posts and messages to identify and flag toxic language, triggering content, and potential suicide risks, ensuring a safe emotional space.
- Glimmer Content Sharing: Users can share uplifting moments by uploading images with captions ('Glimmers'), and engage with others' Glimmers, including a 'warmth' interaction.
- Soul Avatar Customization: Enables users to customize a 'Soul Avatar' that visually represents their current emotional state and identity, providing a unique and expressive profile.

## Style Guidelines:

- Overall dark scheme for a calm and introspective atmosphere. Primary color: Soft Sky Blue (#A7D9FF) chosen for its soothing, reflective qualities. Background color: A very deep, desaturated blue-grey (#1C2A3B) derived from the primary hue, providing a tranquil dark canvas. Accent color: Muted Blue (#5998C5) analogous to the primary, adding a contrasting touch for interactive elements and highlights.
- Headline and body font: 'Inter' (sans-serif) for its modern, clear, and versatile readability, supporting an emotional minimalism aesthetic. Note: currently only Google Fonts are supported.
- Use subtle and emotionally resonant icons that complement the calm, safe-space theme. Integrate the 'soul-avatar' concept for user profiles, allowing for expressive visual identity.
- Emphasize glassmorphism for layered UI elements, ambient gradients for a sense of depth and calm, and sticky navigation for accessibility. Desktop features a left sidebar, while mobile utilizes a bottom navbar and floating blur navigation, ensuring a responsive and intuitive app-like experience.
- Incorporate subtle animations using Framer Motion, such as floating particles in the background, slow and evolving gradient transitions, smooth opacity changes for content loading, and gentle morphing effects for the 'Soul Avatar', to enhance emotional flow and user experience.
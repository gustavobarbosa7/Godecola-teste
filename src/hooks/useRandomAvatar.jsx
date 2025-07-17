import { useState, useEffect } from 'react';

const DICEBEAR_STYLES = [
    'fun-emoji',
    'adventurer-neutral',
    'avataaars-neutral',
    'bottts',
    'bottts-neutral',
    'initials',
    'thumbs',
];

const useRandomAvatar = (seed, fixedStyle = '', format = 'svg') => {
    const [avatarUrl, setAvatarUrl] = useState('');

    useEffect(() => {
        if (!seed) {
            setAvatarUrl('');
            return;
        }

        const safeSeed = String(seed);
        let selectedStyle = fixedStyle;

        if (!fixedStyle || !DICEBEAR_STYLES.includes(fixedStyle)) {
            const randomIndex = Math.floor(Math.random() * DICEBEAR_STYLES.length);
            selectedStyle = DICEBEAR_STYLES[randomIndex];
        }

        const url = `https://api.dicebear.com/8.x/${selectedStyle}/${format}?seed=${safeSeed}`;

        setAvatarUrl(url);
    }, [seed, fixedStyle, format]);

    return avatarUrl;
};

export default useRandomAvatar;
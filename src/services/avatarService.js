export const getAvatarUrl = (firstName, lastName) => {
    const fullName = `${firstName} ${lastName}`.trim();
    const encodedName = encodeURIComponent(fullName);
    return `https://api.dicebear.com/7.x/initials/svg?seed=${encodedName}`;
};

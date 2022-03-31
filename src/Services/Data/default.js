/**
 * Generate a default message for a new friend
 * access having the userId and friendId
 */
export function generateDefaultMessage(userId, friendId) {
    return {
        access: [userId, friendId],
        _id: '108',
        items: [],
        more: 5,
        loadAll: false,

        read: false
    }
}

/**
 * Generate a default media object
 */
export function generateDefaultMedia(userId, friendId) {
    return {
        _id: `media${friendId}`,
        access: [userId, friendId],
        collections: [

        ]
    }
}


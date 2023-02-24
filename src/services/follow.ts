import prisma from '../utils/prisma';

export const getFollows = async (userId: number) => {
    const userFollows = await prisma.user.findUnique({
        where: {
            userId: userId
        },
        select: {
            Followers: {
                include: {
                    Follower: true
                }
            },
            Following: {
                include: {
                    Followed: true
                }
            }
        }
    });
    return userFollows;
}

export const getFollowers = async (userId: number) => {
    const followers = await prisma.follow.findMany({
        where: {
            followedId: userId
        },
        include: {
            Follower: true
        }, orderBy: {
            createdAt: 'desc'
        }
    });
    return followers;
}

export const getFollowing = async (userId: number) => {
    const following = await prisma.follow.findMany({
        where: {
            followerId: userId
        },
        include: {
            Followed: true
        }, orderBy: {
            createdAt: 'desc'
        }
    });
    return following;
}

export const followUser = async (followerId: number, followedId: number) => {
    const follow = await prisma.follow.create({
        data: {
            followerId: followerId,
            followedId: followedId
        }, include: {
            Followed: true,
        }
    });
    return follow;
}

export const unFollowUser = async (followerId: number, followedId: number) => {
    const follow = await prisma.follow.delete({
        where: {
            followerId_followedId: {
                followerId: followerId,
                followedId: followedId
            }
        },
        include: {
            Followed: true,
        }
    });
    return follow;
}

export const countFollowers = async (userId: number) => {
    const followers = await prisma.follow.count({
        where: {
            followedId: userId
        }
    });
    return followers;
}

export const countFollowing = async (userId: number) => {
    const following = await prisma.follow.count({
        where: {
            followerId: userId
        }
    });
    return following;
}



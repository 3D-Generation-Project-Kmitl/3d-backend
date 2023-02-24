import { sendResponse } from '../utils/response';
import { ApplicationError } from '../errors/applicationError';
import { CommonError } from '../errors/common';
import { followService } from '../services';
import { Request, Response, NextFunction } from 'express';

const getFollows = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.userId);
        const follows = await followService.getFollows(userId);
        sendResponse(res, follows, 200);
    } catch (error: any) {
        return next(error);
    }
}

const getFollowers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.userId);
        const followers = await followService.getFollowers(userId);
        sendResponse(res, followers, 200);
    } catch (error: any) {
        return next(error);
    }
}

const getFollowing = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.userId);
        const following = await followService.getFollowing(userId);
        sendResponse(res, following, 200);
    } catch (error: any) {
        return next(error);
    }
}

const followUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const followerId = Number(req.userId);
        const followedId = Number(req.params.id);
        const follow = await followService.followUser(followerId, followedId);
        sendResponse(res, follow, 200);
    } catch (error: any) {
        return next(error);
    }
}

const unFollowUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const followerId = Number(req.userId);
        const followedId = Number(req.params.id);
        const follow = await followService.unFollowUser(followerId, followedId);
        sendResponse(res, follow, 200);
    } catch (error: any) {
        return next(error);
    }
}

export default {
    getFollows,
    getFollowers,
    getFollowing,
    followUser,
    unFollowUser
}
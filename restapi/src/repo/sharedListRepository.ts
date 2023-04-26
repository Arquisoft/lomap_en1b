import mongoose from 'mongoose'
import SharedListSchema from './schemas/SharedList';
const { model } = mongoose
export const SharedList = model('SharedList', SharedListSchema)

export const sharedListRepository = {
    async addToSharedList(userId: string, friendId: string) {

        const newList = new SharedListSchema({
            owner: userId,
            sharedList: friendId
        })



        const newSharedList = new SharedList(newList);
        await newSharedList.save();
        return newSharedList;
    },
    async removeFromSharedList(sharedList: any) {
        const newSharedList = new SharedList(sharedList);
        await newSharedList.save();
        return newSharedList;
    },

};
import mongoose from 'mongoose'
import SharedListSchema from './schemas/SharedList';
const { model } = mongoose
export const SharedList = model('SharedList', SharedListSchema)

export const SharedListRepository = {
    async createSharedList(sharedList: any) {
        const newSharedList = new SharedList(sharedList);
        await newSharedList.save();
        return newSharedList;
    },


};
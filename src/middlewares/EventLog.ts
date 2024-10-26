import EventLog from "../Databases/model/eventLogModel";

export const logEvent = async (action: string,productId: string)=>{
    try {
        await EventLog.create({action,productId});
    } catch (error) {
        console.error('Failed to log event:' ,error);
    }
}
import mongoose from "mongoose";

export interface IVideo {
    _id?:mongoose.Types.ObjectId;
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl?: string;
    controls: Boolean;
    transformation?: {
        width: number;
        height: number;
        quality?:number
    }
}

const videoSchema = new mongoose.Schema<IVideo>({
    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    videoUrl:{
        type: String,
        required: true
    },
    thumbnailUrl: {
        type: String,
        required: true
    },
    controls:{
        type: Boolean,
        default: true
    },
    transformation:{
        width: {
            type: Number,
            default: 1080
        },
        height: {
            type: Number,
            default: 1920
        },
        quality: {
            type: Number,
            min: 1,
            max: 100,
        }
    }
},{ timestamps: true });

const Video = mongoose.models.Video || mongoose.model<IVideo>("Video", videoSchema);

export default Video;
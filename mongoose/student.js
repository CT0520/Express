import { Schema, model } from 'mongoose';

const StudentSchema = new Schema({
    name: {
        type: String,
        require : true
    },
    age: {
        type: Number,
        require: true,
        length: {
            min: 18,
            max : 100
        }
    },
    enrollmentId: {
        type: Number,
       RegExp : '^[0-9]{13}$' 
    }
}, { timestamps: true })

export const student = model('student', StudentSchema);
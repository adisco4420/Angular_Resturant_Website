export class Feedback {
    firstname:string;
    lastname:string;
    telnum:number;
    email:string;
    agree:boolean;
    contacttype:string;
    message:string;
};

export const ContactType = ['None','Tel','Email'];

export class dishFeedback{
    authorname:string;
    message:string;
    rating:number;
    date:string;
}
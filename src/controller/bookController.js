import { prisma } from "../../config.js";

export const registerBook = async (req, res) => {

    try{
       
        const {title, author, isbn, publisherYear, stockCount, bookLoan} = req.body;

        const isBookExists = await prisma.book.findFirst({where: {title: title.toLowerCase()}});

        if(isBookExists) {
            return res.status(400).send("Title of the Book Already Exists");
        }

        const newBook = await prisma.book.create({
            data: {
                title,
                author,
                isbn,
                publisherYear,
                stockCount,
                bookLoan
            }
        });

        return res.status(201).send(newBook);

    }catch(e){
        console.log("error at registering book", e);
        return res.status(400).send(e.message)
    }


}

export const getAllBooks = async (req, res) => {

    try{

        const books = await prisma.book.findMany();
        if(!books) {
            return res.status(400).send("No Books Found");
        }
        return res.status(200).send(books);
        

    }catch(e) {
        console.log("error at getting book", e);
        return res.status(400).send(e.message)
    }

}

export const updateBooks = async (req, res) => {

    try{

        const {title, author, isbn, publisherYear, stockCount, bookLoan} = req.body;
        const isb = req.body.isbn

        const isBookExists = await prisma.book.findUnique({where: {id: parseInt(req.params.id)}});

        if(!isBookExists) {
            return res.status(400).send("No Book found with this Id..");
        }
        
        const isISBNExists = await prisma.book.findFirst({where: {isbn: isbn.toLowerCase()}});

        if(isISBNExists) {
            return res.status(400).send("ISBN Already Exists...");
        }

        const updatedBook = await prisma.book.update({where: {id: parseInt(req.params.id)}, data: {
            title: title.toLowerCase(),
            author: author.toLowerCase(),
            isbn,
            publisherYear,
            stockCount,
            bookLoan,
        }});

        return res.status(201).send(updatedBook)

    }catch(e) {
        console.log("error at registering book", e);
        return res.status(400).send(e.message)
    }

}


export const deleteBook = async (req, res) => {

    const isIdExists = await prisma.book.findUnique({where: {id: parseInt(req.params.id)}});

    if(!isIdExists) {
        return res.status(400).send("No Book Found with this Id...");
    }

    const delBk = await prisma.book.delete({where: {id: parseInt(req.params.id)}});

    return res.status(400).send("Deleted Successfully.")

}
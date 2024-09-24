import { prisma } from "../config/config.js";

export const registerLoan = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    // Ensure bookId is always an array, even if it's a single value
    const bookIds = Array.isArray(bookId) ? bookId : [bookId];

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Check if all books exist
    const books = await prisma.book.findMany({
      where: {
        id: { in: bookIds } // Using an array of book IDs
      }
    });

    if (books.length !== bookIds.length) {
      return res.status(404).send("One or more books not found");
    }

    // Create a loan for each book
    const bookLoans = bookIds.map((bookId) => ({
      userId,
      bookId,
      status: "PENDING"
    }));

    await prisma.bookLoan.createMany({
      data: bookLoans
    });

    return res.status(201).send("Loans created successfully");
  } catch (e) {
    console.log("Error on registering loan", e);
    return res.status(400).send(e.message);
  }
};


export const getAllLoans = async (req, res) => {

 
  const isLoans = await prisma.bookLoan.findMany({
    include: {
      user: {
        select: {
          fullname: true,
          email: true
        }
      },
      book: {
        select: {
          title: true,
          author: true
        }
      }
    }
  });

  if(!isLoans || isLoans.length === 0) {
    return res.status(400).send("No Information Found");

  }


  // if (!loans || loans.length === 0) {
  //   return res.status(404).send("No Information Found");
  // }

  return res.status(201).send(isLoans);
  

}

// export const updateLoans = async (req, res) => {
//   try {
//     const { userId, bookId, status } = req.body;

//     // Ensure bookId is always an array
//     const bookIds = Array.isArray(bookId) ? bookId : [bookId];

//     // Check if user exists
//     const user = await prisma.user.findUnique({ where: { id: userId } });
//     if (!user) {
//       return res.status(404).send("User not found");
//     }

//     // Check if all books exist
//     const books = await prisma.book.findMany({
//       where: { id: { in: bookIds } }
//     });

//     if (books.length !== bookIds.length) {
//       return res.status(404).send("One or more books not found");
//     }

//     const isBookLoanExi = await prisma.bookLoan.findUnique({where: {id: parseInt(req.params.id)}});
//     if(!isBookLoanExi) {
//       return res.status(400).send("No Book Loan found with this Id...")
//     }

//     // Update loans for each book
//     const updatePromises = bookIds.map((bookId) =>
//       prisma.bookLoan.update({
//         where: {
//           userId_bookId: {
//             userId: userId,
//             bookId: bookId
//           }
//         },
//         data: {
//           status: status || "PENDING" // Default to "PENDING" if status is not provided
//         }
//       })
//     );

//     // Execute all update promises
//     await Promise.all(updatePromises);

//     return res.status(200).send("Loans updated successfully");
//   } catch (e) {
//     console.log("Error updating loans", e);
//     return res.status(400).send(e.message);
//   }
// };

export const updateLoans = async (req, res) => {
  try {
    const { userId, bookId, status } = req.body;

    // Ensure bookId is always an array
    const bookIds = Array.isArray(bookId) ? bookId : [bookId];

    // Check if user exists
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Check if all books exist
    const books = await prisma.book.findMany({
      where: { id: { in: bookIds } }
    });

    if (books.length !== bookIds.length) {
      return res.status(404).send("One or more books not found");
    }

    // Update loans for each book
    const updatePromises = bookIds.map((bookId) =>
      prisma.bookLoan.updateMany({
        where: {
          userId: userId,
          bookId: bookId
        },
        data: {
          status: status || "PENDING", // Default to "PENDING" if status is not provided
        }
      })
    );

    // Execute all update promises
    await Promise.all(updatePromises);

    return res.status(200).send("Loans updated successfully");
  } catch (e) {
    console.log("Error updating loans", e);
    return res.status(400).send(e.message);
  }
};


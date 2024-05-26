export function checkENV() {
  let errorFlag = false;

  // Check Telegram Group
  if (!process.env.TARGET_GROUP) {
    errorFlag = true;
    console.log("Telegram target group is empty");
  } else if (!process.env.TARGET_GROUP.startsWith("https://t.me/")) {
    errorFlag = true;
    console.log(
      "Telegram target group is incorrect: ",
      process.env.TARGET_GROUP
    );
  }

  // Start Id number of message
  const startIdNumber = Number(process.env.START_ID_MESSAGE);
  if (!Number.isInteger(startIdNumber) || startIdNumber <= 0) {
    errorFlag = true;
    console.log(
      "START_ID_MESSAGE is not a valid positive integer: ",
      process.env.START_ID_MESSAGE
    );
  }

  // End Id number of message
  const endIdNumber = Number(process.env.END_ID_MESSAGE);
  if (!Number.isInteger(endIdNumber) || endIdNumber <= 0) {
    errorFlag = true;
    console.log(
      "END_ID_MESSAGE is not a valid positive integer: ",
      process.env.END_ID_MESSAGE
    );
  }

  // Check that END_ID_MESSAGE is not greater than START_ID_MESSAGE
  if (startIdNumber <= endIdNumber) {
    errorFlag = true;
    console.log(
      "END_ID_MESSAGE should be less than START_ID_MESSAGE: ",
      process.env.END_ID_MESSAGE
    );
  }

  // Time Out
  const timeOut = Number(process.env.TIME_OUT);
  if (!Number.isInteger(timeOut) || timeOut < 0) {
    errorFlag = true;
    console.log(
      "TIME_OUT is not a valid positive integer: ",
      process.env.TIME_OUT
    );
  }

  // Maximum posts in one file
  const maxPostsInFile = Number(process.env.MAX_POSTS_IN_FILE);
  if (!Number.isInteger(maxPostsInFile) || maxPostsInFile <= 0) {
    errorFlag = true;
    console.log(
      "MAX_POSTS_IN_FILE is not a valid positive integer: ",
      process.env.MAX_POSTS_IN_FILE
    );
  }

  // Output Folder
  if (!process.env.OUTPUT_FOLDER) {
    errorFlag = true;
    console.log("OUTPUT_FOLDER is empty");
  }

  // Output file name
  if (!process.env.FILE_LOCAL_STORAGE) {
    errorFlag = true;
    console.log("FILE_LOCAL_STORAGE is empty");
  }

  return errorFlag;
}

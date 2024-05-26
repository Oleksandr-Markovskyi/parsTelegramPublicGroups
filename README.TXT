## Project Description

This project is a Node.js script that uses Selenium WebDriver to extract messages from a Telegram group. 
The script saves message data into JSON files using the Cheerio library for HTML parsing. 

When parsing public groups, there is no need to authenticate in Telegram.

!!! This code is provided for educational purposes only.




## Project Files

- `src/app.mjs`: The main script file that initiates the message extraction process.
- `src/helpers/checkENV.mjs`: Script for checking environment variables.
- `src/helpers/file/saveFile.mjs`: Script for saving data to a file.
- `src/helpers/scripts/parsing.mjs`: Script for parsing the HTML content of messages.


## Data Source

TARGET_GROUP: Link to the target Telegram group.
START_ID_MESSAGE and END_ID_MESSAGE: data-message-id values from the message HTML code. 
These values can be obtained from the data-message-id attribute in the message elements on the Telegram group web page. 
Example:
<div data-message-id="25763" class="message">


## Example Data

In the attached photos, you can see how message data is extracted, including data-message-id, 
which are used to specify the starting and ending message IDs for parsing.
Example:
<div data-message-id="25763" class="message">

TIME_OUT: Waiting time between requests in milliseconds.
OUTPUT_FOLDER: Folder for saving output files.
FILE_LOCAL_STORAGE: Prefix for the output file name.
MAX_POSTS_IN_FILE: Maximum number of messages in one output file.


## To run the script, execute the following command:
npm i
node src/app.mjs

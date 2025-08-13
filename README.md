# VSCode - WordCount README
 
This is a simple extension that illustrates a number of concepts when it comes to writing extensions for VS Code.  

* Activation on a file type open
* Contributing to the status bar
* Subscribing to update events
* Adding a test to your extension
* Marking up the `package.json` so the gallery looks good

## Functionality

Open any file and the status bar will show an auto-updating word count for the entire document. If you make a (multi-)selection, the status bar will additionally show the number of words contained only in the current selection inside parentheses. When no text is selected, only the total document word count is shown.

If the total word count cannot be determined for any reason, the status bar will show 'Word Count Unavailable' (and still show a selection count if that part can be computed).

![Word Count in status bar](images/wordcount.gif)

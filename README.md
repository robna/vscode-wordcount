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

## Screenshot

![Status Bar Word Count](images/wordcount.gif)

The display shows: total words and, when text is selected, a parenthetical selected word count (e.g. `123 Words (5 Selected)`).

## Attribution

This extension is a modernized fork of the original sample published at `microsoft/vscode-wordcount` (MIT Licensed). Significant changes include support for all file types, selection word counts, error/large-file fallbacks, and build/tooling modernization.

![Word Count in status bar](images/wordcount.gif)

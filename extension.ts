// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import {window, workspace, commands, Disposable, ExtensionContext, StatusBarAlignment, StatusBarItem, TextDocument} from 'vscode';

// this method is called when your extension is activated. activation is
// controlled by the activation events defined in package.json
export function activate(ctx: ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "Wordcount" is now active!');

    // create a new word counter
    let wordCounter = new WordCounter();
    let controller = new WordCounterController(wordCounter);

    // add to a list of disposables which are disposed when this extension
    // is deactivated again.
    ctx.subscriptions.push(controller);
    ctx.subscriptions.push(wordCounter);
}

export class WordCounter {

    private _statusBarItem!: StatusBarItem; // initialized lazily

    public updateWordCount() {
        
        // Create as needed
        if (!this._statusBarItem) {
            this._statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left);
        } 

        // Get the current text editor
        let editor = window.activeTextEditor;
        if (!editor) {
            this._statusBarItem.hide();
            return;
        }

        let doc = editor.document;

        let totalWordCount: number | null = null;
        let selectedWordCountTotal: number | null = null;
        try {
            // Count all words for any file type now (previously only markdown)
            const approxSize = doc.getText().length;
            if (approxSize > 5_000_000) { // ~5MB guard
                throw new Error('File too large to count efficiently');
            }
            totalWordCount = this._getWordCount(doc);

            // Determine selected text word count (aggregate across multi-selections)
            const editorSelections = editor.selections || [];
            let selectedAccumulator = 0;
            for (const sel of editorSelections) {
                if (sel.isEmpty) { continue; }
                const text = doc.getText(sel);
                selectedAccumulator += this._countWordsFromString(text);
            }
            selectedWordCountTotal = selectedAccumulator;
        } catch (err) {
            // Swallow any unexpected errors and fall through to display a friendly message.
            totalWordCount = null;
        }

        // Build status bar text with graceful fallbacks
        let text: string;
        if (totalWordCount === null) {
            if (selectedWordCountTotal && selectedWordCountTotal > 0) {
                text = `$(pencil) ${selectedWordCountTotal === 1 ? '1 Selected' : `${selectedWordCountTotal} Selected`} (Total N/A)`;
            } else {
                text = '$(pencil) Word Count Unavailable';
            }
        } else {
            const totalWordsPart = totalWordCount === 1 ? '1 Word' : `${totalWordCount} Words`;
            text = `$(pencil) ${totalWordsPart}`;
            if (selectedWordCountTotal && selectedWordCountTotal > 0) {
                text += selectedWordCountTotal === 1 ? ` (1 Selected)` : ` (${selectedWordCountTotal} Selected)`;
            }
        }
        this._statusBarItem.text = text;
        this._statusBarItem.show();
    }

    public _getWordCount(doc: TextDocument): number {
        let docContent = doc.getText();
        return this._countWordsFromString(docContent);
    }

    private _countWordsFromString(text: string): number {
        if (typeof text !== 'string') { return 0; }
        // Parse out unwanted whitespace so the split is accurate
        let content = text.replace(/(< ([^>]+)<)/g, '').replace(/\s+/g, ' ');
        content = content.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        if (content === '') { return 0; }
        return content.split(' ').length;
    }

    public dispose() {
        this._statusBarItem.dispose();
    }
}

class WordCounterController {

    private _wordCounter: WordCounter;
    private _disposable: Disposable;

    constructor(wordCounter: WordCounter) {
        this._wordCounter = wordCounter;
        this._wordCounter.updateWordCount();

        // subscribe to selection change and editor activation events
        let subscriptions: Disposable[] = [];
        window.onDidChangeTextEditorSelection(this._onEvent, this, subscriptions);
        window.onDidChangeActiveTextEditor(this._onEvent, this, subscriptions);

        // create a combined disposable from both event subscriptions
        this._disposable = Disposable.from(...subscriptions);
    }

    private _onEvent() {
        this._wordCounter.updateWordCount();
    }

    public dispose() {
        this._disposable.dispose();
    }
}

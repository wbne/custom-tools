import ebooklib
from ebooklib import epub
import html2text

FILE_DIR = "./Y Daniel Liang - Introduction to Java Programming and Data Structures, Comprehensive Version-Pearson (2017).epub"
book = epub.read_epub(FILE_DIR)
h = html2text.HTML2Text()
h.ignore_links = True

def codeBits():
    f = open("awagga.txt", "w", encoding="utf-8")
    code = False
    for x in  book.get_items_of_type(ebooklib.ITEM_DOCUMENT):
        rawString = epub.EpubHtml.get_content(x)
        parsed = h.handle(rawString.decode("utf-8"))
        if(".java`" in parsed):
            code = True
        if("![](../images/Output_Icon.png)" in parsed):
            code = False
        if(code):
            qq = parsed.split("\n")
            for awagga in qq:
                if("    " in awagga):
                    f.write(awagga)
                if("# " in awagga and "Chapter Summary" not in awagga and "Key Terms" not in awagga and "![]" not in awagga and "Figure " not in awagga):
                    f.write("\n"+awagga+"\n")
    f.close()  

def keyPoints():
    f = open("awagga2.txt", "w", encoding="utf-8")
    chapter = 0
    EoC = False #End of Chapter
    counter = 0
    for x in  book.get_items_of_type(ebooklib.ITEM_DOCUMENT):
        rawString = epub.EpubHtml.get_content(x)
        parsed = h.handle(rawString.decode("utf-8", errors='ignore'))
        if("# Key Terms" in parsed):
            EoC = True
            counter = 1
            chapter += 1
            f.write("CHAPTER: " + str(chapter))
        elif("#" in parsed):
            if(counter != 0):
                counter -= 1
            else:
                EoC = False
        if(EoC):
            f.write(parsed)
    f.close()

keyPoints()
codeBits()

print("done :)")
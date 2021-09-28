import java.util.Scanner;
import java.io.File;
import java.io.FileWriter;
public class HW_Generator
{
    public static void main(String[] args) throws Exception {
        Scanner sc = new Scanner(System.in);
        System.out.print("File Name: ");
        String name = sc.nextLine();
        System.out.print("Number of Files: ");
        int num = sc.nextInt();
        sc.nextLine();

        String[] s = template();
        int POINTER = 4;

        for(int i = 1; i <= num; i++) {
            File f = new File(name + "_" + i + ".java");
            FileWriter fw = new FileWriter(f);
            fw.write("");
            for(int j = 0; j < s.length; j++) {
                if(j == POINTER) {
                    fw.append(s[j] + name + "_" + i);
                }
                else {
                    fw.append(s[j]);
                }
                fw.append("\n");
            }
            fw.close();
        }
    }

    private static String[] template(){
        String[] template = {
                "/*",
                " * Ben Wang",
                " * CS2336 Khan",
                " */",
                "public class ",
                "{",
                "\tpublic static void main(String []args){",
                "\t\t",
                "\t}",
                "}"
            };
        return template;
    }
}

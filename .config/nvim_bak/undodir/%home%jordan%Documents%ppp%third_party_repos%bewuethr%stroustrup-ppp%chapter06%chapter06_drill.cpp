Vim�UnDo� ;�$�oX)0��0 M�c+�>���z	�� {U   �                                   a�̓    _�                     r       ����                                                                                                                                                                                                                                                                                                                                                             aܜ[    �      �   �   �   class Token{   public:   +    char kind;        // what kind of token   -    double value;     // for numbers: a value   1    Token(char ch)    // make a Token from a char           :kind(ch), value(0) { }   K    Token(char ch, double val)     // make a Token from a char and a double            :kind(ch),value(val) { }   };       P//------------------------------------------------------------------------------       class Token_stream {   public:   @    Token_stream();   // make a Token_stream that reads from cin   A    Token get();      // get a Token (get() is defined elsewhere)   1    void putback(Token t);    // put a Token back   private:   8    bool full;        // is there a Token in the buffer?   O    Token buffer;     // here is where we keep a Token put back using putback()   };       P//------------------------------------------------------------------------------       G// The constructor just sets full to indicate that the buffer is empty:   Token_stream::Token_stream()   4    :full(false), buffer(0)    // no Token in buffer   {   }       P//------------------------------------------------------------------------------       W// The putback() member function puts its argument back into the Token_stream's buffer:   #void Token_stream::putback(Token t)   {   4    if (full) error("putback() into a full buffer");   )    buffer = t;       // copy t to buffer   +    full = true;      // buffer is now full   }       P//------------------------------------------------------------------------------       Token Token_stream::get()   {   :    if (full) {       // do we already have a Token ready?   #        // remove token from buffer           full = false;           return buffer;       }           char ch;   N    cin >> ch;    // note that >> skips whitespace (space, newline, tab, etc.)           switch (ch) {       case ';':    // for "print"       case 'q':    // for "quit"   ?    case '(': case ')': case '+': case '-': case '*': case '/':   G        return Token(ch);        // let each character represent itself       case '.':   5    case '0': case '1': case '2': case '3': case '4':   D    case '5': case '6': case '7': case '8': case '9': // FIX add '8'       {   H        cin.putback(ch);         // put digit back into the input stream           double val;   @        cin >> val;              // read a floating-point number   @        return Token('8',val);   // let '8' represent "a number"       }       default:           error("Bad token");       }   }       P//------------------------------------------------------------------------------       7Token_stream ts;        // provides get() and putback()       P//------------------------------------------------------------------------------       Ndouble expression();    // declaration so that primary() can call expression()       P//------------------------------------------------------------------------------       $// deal with numbers and parentheses   double primary()   {       Token t = ts.get();       switch (t.kind) {   -    case '(':    // handle '(' expression ')'       {            double d = expression();           t = ts.get();   1        if (t.kind != ')') error("')' expected");           return d;       }   <    case '8':            // we use '8' to represent a number   5        return t.value;  // return the number's value       default:   "        error("primary expected");       }   }       P//------------------------------------------------------------------------------       // deal with *, /, and %   double term()   {       double left = primary();   F    Token t = ts.get();        // get the next token from token stream           while (true) {           switch (t.kind) {           case '*':               left *= primary();               t = ts.get();               break;           case '/':   	        {   !            double d = primary();   0            if (d == 0) error("divide by zero");               left /= d;               t = ts.get();               break;   	        }           default:   B            ts.putback(t);     // put t back into the token stream               return left;   	        }       }   }       P//------------------------------------------------------------------------------       // deal with + and -   double expression()   {   :    double left = term();      // read and evaluate a Term   F    Token t = ts.get();        // get the next token from token stream           while (true) {           switch (t.kind) {           case '+':   7            left += term();    // evaluate Term and add               t = ts.get();               break;           case '-':   <            left -= term();    // evaluate Term and subtract               t = ts.get();               break;           default:   B            ts.putback(t);     // put t back into the token stream   L            return left;       // finally: no more + or -: return the answer   	        }       }   }       P//------------------------------------------------------------------------------       
int main()   try {   2    cout << "Welcome to our simple calculator.\n";   G    cout << "Please enter expressions using floating-point numbers.\n";   5    cout << "Operators available: +, -, *, /, ().\n";   G    cout << "To print the result, enter ';' and to quit, enter 'q'.\n";       while (cin) {   '        cout << "> ";   // print prompt           Token t = ts.get();   8        while (t.kind == ';') t = ts.get();   // eat ';'           if (t.kind == 'q') {               keep_window_open();               return 0;   	        }           ts.putback(t);   -        cout << "= " << expression() << endl;       }       keep_window_open();       return 0;   }   catch (exception& e) {   *    cerr << "error: " << e.what() << '\n';       keep_window_open("~~");       return 1;   }   catch (...) {   )    cerr << "Oops: unknown exception!\n";       keep_window_open("~~");       return 2;5��           �       �       �      e            5�_�                    �       ����                                                                                                                                                                                                                                                                                                                                                             a��     �   �   �   �      P//------------------------------------------------------------------------------5�5�_�                       
    ����                                                                                                                                                                                                                                                                                                                                                             a���     �         �      ,#include "../lib_files/std_lib_facilities.h"5��       
                  #                     5�_�                       
    ����                                                                                                                                                                                                                                                                                                                                                             a���     �         �      +#include "./lib_files/std_lib_facilities.h"5��       
                  #                     5�_�                       
    ����                                                                                                                                                                                                                                                                                                                                                             a���     �         �      *#include "/lib_files/std_lib_facilities.h"5��       
                  #                     �                        %                    �                        %                    �                        %                    �                     
   %             
       �                        .                    �                        /                    �                        /                    �                        /                    �                         2                     5�_�                           ����                                                                                                                                                                                                                                                                                                                                                             a���     �         �      9#include "~/Documents/ppp/lib_files/std_lib_facilities.h"5��              
           2      
               5�_�                           ����                                                                                                                                                                                                                                                                                                                                                             a���     �         �      /#include "~/Documents/ppp/std_lib_facilities.h"5��                        3                    �                        3                    �                     	   2             	       �                     	   3             	       �              	       	   3      	       	       �              	       
   3      	       
       �              
          3      
              �                        3                    �                        3                    �                        3                    �                        3                    �       .                  G                     �       .                  G                     5�_�      	                 
    ����                                                                                                                                                                                                                                                                                                                                                             a��     �         �      /#include "~/Documents/ppp/std_lib_facilities.h"5��       
                  #                     5�_�      
           	          ����                                                                                                                                                                                                                                                                                                                                                             a��!     �         �      0#include "/~/Documents/ppp/std_lib_facilities.h"5��                         $                     5�_�   	              
          ����                                                                                                                                                                                                                                                                                                                                                             a��"     �         �      /#include "//Documents/ppp/std_lib_facilities.h"5��                         $                     �                        $                    �                        $                    �                        $                    �                        $                    �                        $                    �                        *                    �                        *                    5�_�   
                        ����                                                                                                                                                                                                                                                                                                                                                             a��'    �         �      <#include "/Users/jordan//Documents/ppp/std_lib_facilities.h"5��                         0                     5�_�                            ����                                                                                                                                                                                                                                                                                                                                                             a��@     �         �       �         �    5��                          U                     5�_�                            ����                                                                                                                                                                                                                                                                                                                                                             a��@     �         �      /�         �    5��                         V                     5�_�                            ����                                                                                                                                                                                                                                                                                                                                                             a��C     �         �    �         �    5��                          X              ,       5�_�                            ����                                                                                                                                                                                                                                                                                                                                                             a��D     �         �      +#include "../text_lib/std_lib_facilities.h"�         �    5��                         Y                     5�_�                            ����                                                                                                                                                                                                                                                                                                                                                             a��E    �         �      ,#/include "../text_lib/std_lib_facilities.h"5��                          X                     5�_�                           ����                                                                                                                                                                                                                                                                                                                                                             a��v     �         �      +/include "../text_lib/std_lib_facilities.h"5��                        e                    �                        e                    �                     	   e             	       5�_�                            ����                                                                                                                                                                                                                                                                                                                                                             a��     �         �      ,/include "../lib_files/std_lib_facilities.h"5��                         X                    5�_�                             ����                                                                                                                                                                                                                                                                                                                                                             a�͂    �                ;#include "/Users/jordan/Documents/ppp/std_lib_facilities.h"5��                                <               5��
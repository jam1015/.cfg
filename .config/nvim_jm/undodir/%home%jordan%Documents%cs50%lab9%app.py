Vim�UnDo� ����*��-/*uR�l����ЋH����q[       		                                 bY    _�                             ����                                                                                                                                                                                                                                                                                                                                                             b�3     �               app = Flask(__name__)    5��                         �                      5�_�                       %    ����                                                                                                                                                                                                                                                                                                                                                             b�K     �                 &		return render_template("index.html")5��       %                  �                     5�_�                       &    ����                                                                                                                                                                                                                                                                                                                                                             b�L    �                 '		return render_template("index.html",)5��       &                  �                     �       &                 �                    �       &                 �                    �       &                 �                    �       &                 �                    �       &              	   �             	       �       -                 �                    �       -                 �                    �       -                 �                    �       -                 �                    �       -                 �                    5�_�                           ����                                                                                                                                                                                                                                                                                                                                                             b5     �               		�             5��                          �                     �                         �                     �                        �                    �                        �                    �                        �                    �                        �                    �                        �                    �       
                 �                    �       
                 �                    �       
                 �                    �       
                 �                    �       
                 �                    �       
                 �                    �                        �                    �                        �                    �                        �                    �                        �                    5�_�                           ����                                                                                                                                                                                                                                                                                                                                                             bB     �               		month = request.form.get(5��                         �                     �                        �                    �                        �                    �                        �                    �                        �                    5�_�                       "    ����                                                                                                                                                                                                                                                                                                                                                             bE     �             �             5��                          �              $       5�_�                           ����                                                                                                                                                                                                                                                                                                                                                             bF     �             �             5��                                        $       5�_�      	                     ����                                                                                                                                                                                                                                                                                                                                                             bH     �               #		month = request.form.get("month")5��                        �                    �                         �                     �                         �                     �                        �                    5�_�      
           	          ����                                                                                                                                                                                                                                                                                                                                                             bJ     �               #		month = request.form.get("month")5��                                            �                                              �                                            �                                              �                                              �                                            �                                              �                                              �                                              �                                            �                                              5�_�   	              
          ����                                                                                                                                                                                                                                                                                                                                                             bO     �               !		day = request.form.get("month")5��                                            �                                            �                                            5�_�   
                        ����                                                                                                                                                                                                                                                                                                                                                             bU     �               "		year = request.form.get("month")5��                                            �                                              �                                            �                                              �                                              �                                            �                                              �                                              �                                              �                                            5�_�                           ����                                                                                                                                                                                                                                                                                                                                                             b[    �               "		name = request.form.get("month")5��                        /                    �                        /                    �                        /                    �                        /                    5�_�                           ����                                                                                                                                                                                                                                                                                                                                                             b�     �                		�             5��                          6                     �                         8                     �                        8                    �                        8                    �                        8                    �                        8                    �                        8                    �                        8                    �                        ;                    �                        ;                    �                        ;                    �                        ;                    �                        ;                    �                        ;                    �                        ;                    5�_�                           ����                                                                                                                                                                                                                                                                                                                                                             b�     �                		db.execute(5��                         C                     �                        C                    �                        C                    �                        C                    �                        C                    �                        C                    �                     
   C             
       �                        K                    �                        K                    �                        K                    �                        O                    �                        P                    �                        P                    �                        P                    �                        P                    �                        P                    �                        P                    �                     	   P             	       �              	          P      	              5�_�                       %    ����                                                                                                                                                                                                                                                                                                                                                             b�     �                %		db.execute("INSERT INTO birthdays (5��       %                  [                     �       %                 [                    �       %                 [                    �       %                 [                    5�_�                       *    ����                                                                                                                                                                                                                                                                                                                                                             b�     �                *		db.execute("INSERT INTO birthdays (name,5��       *                  `                     �       +                 a                    �       +                 a                    �       +                 a                    �       /                 e                    5�_�                       1    ����                                                                                                                                                                                                                                                                                                                                                             b�     �                1		db.execute("INSERT INTO birthdays (name, mondy,5��       1                  g                     �       .                 d                    �       +                 a                    �       1                 g                    5�_�                       2    ����                                                                                                                                                                                                                                                                                                                                                             b�     �                2		db.execute("INSERT INTO birthdays (name, monthy,5��       2                  h                     �       3                 i                    5�_�                       7    ����                                                                                                                                                                                                                                                                                                                                                             b      �                7		db.execute("INSERT INTO birthdays (name, monthy, day)5��       7                  m                     �       ;                 q                    �       <                 r                    5�_�                       ?    ����                                                                                                                                                                                                                                                                                                                                                             b     �                ?		db.execute("INSERT INTO birthdays (name, monthy, day) VALUES(5��       ?                  u                     5�_�                       @    ����                                                                                                                                                                                                                                                                                                                                                             b     �                @		db.execute("INSERT INTO birthdays (name, monthy, day) VALUES()5��       @                  v                     5�_�                       B    ����                                                                                                                                                                                                                                                                                                                                                             b     �                B		db.execute("INSERT INTO birthdays (name, monthy, day) VALUES()",5��       B                  x                     �       C                 y                    �       C                 y                    �       C                 y                    5�_�                       H    ����                                                                                                                                                                                                                                                                                                                                                             b     �                H		db.execute("INSERT INTO birthdays (name, monthy, day) VALUES()", name,5��       H                  ~                     �       I                                     �       I                                     �       I                                     �       I                                     �       M                 �                    5�_�                       O    ����                                                                                                                                                                                                                                                                                                                                                             b     �                O		db.execute("INSERT INTO birthdays (name, monthy, day) VALUES()", name, month,5��       O                  �                     �       P                 �                    5�_�                       ?    ����                                                                                                                                                                                                                                                                                                                                                             b     �                T		db.execute("INSERT INTO birthdays (name, monthy, day) VALUES()", name, month, day)5��       ?                  u                     �       ?                 u                    �       ?                 u                    5�_�                       D    ����                                                                                                                                                                                                                                                                                                                                                             b     �                Y		db.execute("INSERT INTO birthdays (name, monthy, day) VALUES(name,)", name, month, day)5��       D                  z                     �       E                 {                    �       E                 {                    �       E                 {                    �       E                 {                    5�_�                       K    ����                                                                                                                                                                                                                                                                                                                                                             b     �                `		db.execute("INSERT INTO birthdays (name, monthy, day) VALUES(name, month,)", name, month, day)5��       K                  �                     �       L                 �                    5�_�                      ?    ����                                                                                                                                                                                                                                                                                                                                          !       v   '    b     �                d		db.execute("INSERT INTO birthdays (name, monthy, day) VALUES(name, month, day)", name, month, day)5��       ?                 u                    5�_�                       B    ����                                                                                                                                                                                                                                                                                                                                          !       v   '    b�     �                a		db.execute("INSERT INTO birthdays (name, monthy, day) VALUES(?, month, day)", name, month, day)5��       B                 x                    5�_�                        E    ����                                                                                                                                                                                                                                                                                                                                          !       v   '    b�    �                ]		db.execute("INSERT INTO birthdays (name, monthy, day) VALUES(?, ?, day)", name, month, day)5��       E                 {                    5�_�                         0    ����                                                                                                                                                                                                                                                                                                                                          !       v   '    bX    �                [		db.execute("INSERT INTO birthdays (name, monthy, day) VALUES(?, ?, ?)", name, month, day)5��       0                  f                     5�_�                       N    ����                                                                                                                                                                                                                                                                                                                                                             b$     �      !          		db.execute(   K		    "INSERT INTO birthdays (name, monthy, day) VALUES(name, month, day)",   		    name, month, day)       		return redirect("/")       	else:       ;		# TODO: Display the entries in the database on index.html   0		people = db.execute("SELECT * FROM birthdays")       5		return render_template("index.html", people=people)5��           
              6      )      7      5��
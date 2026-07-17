import random
l=["ROCK", "PAPER","SCISSOR"]


while True:
    computer_points=0
    Player_points=0
    User_choice=int(input('''
 GAME START....
1 for Yes enter 1
2 for NO-EXIT enter 2
                          '''))
    
    if User_choice==1:
        for i in range (1,6):
            userInput=int(input(''' 
1 ROCK
2 SCISSOR
3 PAPER
                                '''))
            if userInput==1:
                uoption="ROCK"
            elif userInput==2:
                uoption="SCISSOR"
            elif userInput==3:
                uoption="PAPER"
            coption=random.choice(l)
            print(uoption)
            print(coption)
            if coption==uoption:
                print("Computer Value:",coption)
                print("User Value:",uoption)
                print("Game Draw")
                computer_points=computer_points+1
                Player_points= Player_points+1
            elif(uoption=="ROCK" and coption=="SCISSOR")or (uoption=="SCISSOR" and coption=="PAPER")or(uoption=="PAPER" and coption=="ROCK"):
                print("Computer Value:",coption)
                print("User Value:",uoption)
                print(" YOU win")
                Player_points=Player_points+1
            else:
                print("Computer Value:",coption)
                print("User Value:",uoption)
                print(" COMPUTER win")
                computer_points=computer_points+1
                





        if(Player_points==computer_points):
            print("Match Draw")
        elif(Player_points>computer_points):
            print(f"You won the match,{Player_points}points")
        else:
            print(f"Computer wins,{computer_points}points")




    
    




    else:
        break



#%%

import os
import shutil
dirs = os.listdir(".")
print(dirs)
import json

q = {}
maxlen = 0
cnt = 0 

for d in dirs:
    if d.endswith(".json"):
        with open(d,mode="r",encoding="utf-8") as f:
            data = json.load(f)
            for i in data:
                question = i["question"].strip()
                answer = i["answer"]
                answer = list(i.strip() for i in answer)
                key = f"{question}.{'.'.join(answer)}"
                if key not in q:
                    q[key] = {
                        "q":question,
                        "a":answer
                    }
                maxlen = max(maxlen,len(answer))
        cnt+=1
        shutil.move(d,f"{cnt}.json")

print(maxlen)
print(len(q))
qt = '\t'.join(f'选项{i+1}' for i in range(maxlen))
with open("questions.csv","w",encoding="utf-8") as o:
    o.write(f"题目\t{qt}\t答案\n")
    for k in q:
        o.write("{}\t{}\n".format(q[k]["q"],"\t".join(q[k]["a"])))
    o.flush()

    


# %%

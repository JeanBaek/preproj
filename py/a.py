ages = [a for a in range(12, 64)] # 12에서 63까지 숫자가 생성된다.

applicant_age = ages

for a in applicant_age:
  picked_age = []
  if a < 40:
    continue
  else:
    picked_age.append(a)
    print (picked_age, end=', ')
    
print("Hello world!")
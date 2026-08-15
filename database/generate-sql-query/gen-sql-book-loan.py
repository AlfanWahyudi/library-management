import csv
import random
from datetime import datetime, timedelta
from collections import Counter, defaultdict



"""
--- member data ---
- total 20 data
- Id member yang engga ada "11,12,13,17,21,22,23,24,25"


--- book data ---
- total 53
- sequence Id book -> 1 sampai 3 & 34 sampai 83


--- book loan ---
- maksimal total meminjam buku dalam satu minggu adalah (20 * 3 = 60), karena 60 > 53 jadi max_loan_book nya tetap 53
- data peminjaman buku dimulai dari bulan 6-2025 sampai sekarang (8)-2026
- dari tanggal 02-06-2025 sampai 14-08-2025
- setiap member harus pernah meminjam minimal satu bulan 1 buku, jadi total nya sampai bulan 7-2026 : 13 pinjaman
- minimal buku dipinjam satu kali sampai hari tgl 07-08-2025, jum'at sebelumnnya agar pada hari ini jadi 1 minggu dan sudah dikembalikan
- Jadwal peminjaman hanya sampai sabtu, minggu tutup. dan pengembalian tidak ada hari minggu
  > Juni: 1,8,15,22,29
  > Juli: 6,13,20,27
  > Agus: 3,10,17,24,31
  > Sep: 7,14,21,28
  > Okto: 5,12,19,26
  > Nov: 2,9,16,23,30
  > Des: 7,14,21,28
  > Jan: 4,11,18,25
  > Feb: 1,8,15,22
  > Mar: 1,8,15,22,29
  > April: 5,12,19,26
  > Mei: 3,10,17,24,31
  > Jun: 7,14,21,28
  > Jul: 5,12,19,26
  > Agu: 2
"""


filename = "book_loan_insert_query"
ext = ".txt"

totalMember = 20
totalBook = 53
maxLoanEachDays = 22
rangeDaysBookLoan = 7
maxMemberLoanInRangeDaysBookLoan = 3

memberIdItems = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  14,
  15,
  16,
  18,
  19,
  20,
  26,
  27,
  28,
  29
]

bookIdItems = [
  35,
  34,
  38,
  50,
  58,
  83,
  64,
  67,
  80,
  81,
  74,
  60,
  78,
  70,
  45,
  79,
  65,
  75,
  63,
  61,
  77,
  39,
  69,
  71,
  73,
  68,
  2,
  3,
  1,
  42,
  54,
  41,
  55,
  48,
  52,
  44,
  57,
  49,
  59,
]

blConstrainEachMonth = [
  {
    "month": 6,
    "year": 2025,
    "maxTotalLoan": 53,
    "lastDay": 30,
    "skippedDays": [1,8,15,22,29],
  },
  {
    "month": 7,
    "year": 2025,
    "maxTotalLoan": 55,
    "lastDay": 31,
    "skippedDays": [6,13,20,27],
  },
  {
    "month": 8,
    "year": 2025,
    "maxTotalLoan": 45,
    "lastDay": 31,
    "skippedDays": [3,10,17,24,31],
  },
  {
    "month": 9,
    "year": 2025,
    "maxTotalLoan": 49,
    "lastDay": 30,
    "skippedDays": [7,14,21,28],
  },
  {
    "month": 10,
    "year": 2025,
    "maxTotalLoan": 53,
    "lastDay": 31,
    "skippedDays": [5,12,19,26],
  },
  {
    "month": 11,
    "year": 2025,
    "maxTotalLoan": 40,
    "lastDay": 30,
    "skippedDays": [2,9,16,23,30],
  },
  {
    "month": 12,
    "year": 2025,
    "maxTotalLoan": 35,
    "lastDay": 31,
    "skippedDays": [7,14,21,28],
  },
  {
    "month": 1,
    "year": 2026,
    "maxTotalLoan": 30,
    "lastDay": 31,
    "skippedDays": [4,11,18,25],
  },
  {
    "month": 2,
    "year": 2026,
    "maxTotalLoan": 29,
    "lastDay": 28,
    "skippedDays": [1,8,15,22],
  },
  {
    "month": 3,
    "year": 2026,
    "maxTotalLoan": 53,
    "lastDay": 31,
    "skippedDays": [1,8,15,22,29],
  },
  {
    "month": 4,
    "year": 2026,
    "maxTotalLoan": 42,
    "lastDay": 30,
    "skippedDays": [5,12,19,26],
  },
  {
    "month": 5,
    "year": 2026,
    "maxTotalLoan": 31,
    "lastDay": 31,
    "skippedDays": [3,10,17,24,31],
  },
  {
    "month": 6,
    "year": 2026,
    "maxTotalLoan": 56,
    "lastDay": 30,
    "skippedDays": [7,14,21,28],
  },
  {
    "month": 7,
    "year": 2026,
    "maxTotalLoan": 49,
    "lastDay": 31,
    "skippedDays": [5,12,19,26],
  },
  {
    "month": 8,
    "year": 2026,
    "maxTotalLoan": 27,
    "lastDay": 7,
    "skippedDays": [2],
  },
]

generatedBookLoans = [
]


# --- generate book loans data ----
for item in blConstrainEachMonth :
  currBookLoan = []
  maxTotalLoan = item["maxTotalLoan"]
  totalLoan = 0
  memberIdLoan = []
  bookIdLoan = []
  
  print("===========================================")
  print(f"year : {item["year"]}")
  print(f"moth : {item["month"]}")
  for day in range(1, item["lastDay"] + 1):
    if (totalLoan >= maxTotalLoan):
      break
    if (day not in item["skippedDays"]):
      print("--------------------------------")      
      print(f"day: {day}")

      randomMaxLoanCurrDay = random.randint(1, maxLoanEachDays)
      print(f"max loan a book in a day: {randomMaxLoanCurrDay}")
      
      remainingTotalLoan = maxTotalLoan - totalLoan
      print(f"Remaining Total Loan: {remainingTotalLoan}")
      
      calculatedLoan = 0
      if (randomMaxLoanCurrDay > remainingTotalLoan):
        calculatedLoan = remainingTotalLoan
      else:
        calculatedLoan = randomMaxLoanCurrDay
        
      print(f"calculated loan: {calculatedLoan}")

      for loan in range(1, calculatedLoan + 1):
        # if memberId or bookId duplicate dan melebihi batas peminjaman dalam satu minggu (waktu yang telah ditentukan) ambil id member yang lain
        randMemberId = random.choice(memberIdItems)
        randBookId = random.choice(bookIdItems)      
        # check if bookId is already used  
        randHour = random.randint(8, 17)
        randMinute = random.randint(1, 59)
        startDateBl = datetime(item["year"], item["month"], day, randHour, randMinute)
        endDateBl = startDateBl + timedelta(days=rangeDaysBookLoan)
        
        finishedHour = random.randint(8, 15)
        finishedDate = endDateBl.strftime("%Y-%m-%d") + f" {finishedHour:02d}:00:00.000000"
        
        createdByRandUserId = random.randint(1, 2)
        updatedByRandUserId = random.randint(1, 2)
        
        result = {
          "memberId": randMemberId,
          "bookId": randBookId,
          "startDate": startDateBl.strftime("%Y-%m-%d %H:%M:%S"),
          "endDate": endDateBl.strftime("%Y-%m-%d") + " 23:59:59.000000",
          "finishedDate": finishedDate,
          "createdAt": startDateBl.strftime("%Y-%m-%d %H:%M:%S"),
          "createdBy": str(createdByRandUserId),
          "updatedAt": finishedDate,
          "updatedBy": str(updatedByRandUserId),
        }

        # save book loan data 
        currBookLoan.append(result)
        
        # save memberId untuk nanti dilakukan pengecekan duplikat peminjam
        memberIdLoan.append(randMemberId)
        
        # save bookId untuk melakukan pengecekan duplikasi peminjaman dalam 1 bulan
        bookIdLoan.append(randBookId)
        
        # count totalLoan yang berhasil
        totalLoan = totalLoan + 1
        
      print(f"current totalLoan: {totalLoan}")
  
  # remove duplicate book_id in a month
  print("\n----- remove duplicate book_id")
  blRemovedDupBookIdItems = []
  seenBookIds = set()
  for currBl in currBookLoan:
    if currBl["bookId"] not in seenBookIds:
      blRemovedDupBookIdItems.append(currBl)
      seenBookIds.add(currBl["bookId"])
    else:
      print(f"bookId: {currBl["bookId"]} is duplicate on month : {item["month"]}")
  
  print(f"jumlah book loan setelah di hapus duplikat book_id: {len(blRemovedDupBookIdItems)}")
  # remove memberId if more than 3 loan a book
  print("")
  print("----- remove duplicate memberId if more than 3 loan a book")
  memberIdCounts = Counter(data["memberId"] for data in blRemovedDupBookIdItems)
  blLastFilterItems = []
  for memberId, count in memberIdCounts.items():
    matchingBl = [
      bl for bl in blRemovedDupBookIdItems
      if bl["memberId"] == memberId
    ]
    
    totalMemberLoan = len(matchingBl)
    if (totalMemberLoan > 3):
      print(f"memberId: {memberId} -> meminjam sebanyak: {totalMemberLoan}")
    
    
    blLastFilterItems.extend(matchingBl[:3])    
  
  print(f"Jumlah book loan setelah dihapus member_id yang melebihi 3: {len(blLastFilterItems)}")
  
  # simpan hasil generate book loan
  generatedBookLoans.extend(blLastFilterItems)
  print(" ")


with open("./generated_files/" + filename + ext, "w", encoding="utf-8") as file:
  for bl in generatedBookLoans:
      file.write(f"INSERT INTO book_loans as bl (member_id, book_id, start_date, end_date, finished_date, created_at, created_by, updated_at, updated_by) VALUES ({bl['memberId']}, {bl['bookId']}, '{bl['startDate']}', '{bl['endDate']}', '{bl['finishedDate']}', '{bl['createdAt']}', '{bl['createdBy']}', '{bl['updatedAt']}', '{bl['updatedBy']}');\n")

print(filename + ext + " created!")


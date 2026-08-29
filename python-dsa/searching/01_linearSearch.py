arr =[10, 25, 7, 40, 15]
target = 40



def linear_search(arr):
    for i in range(len(arr)):
      if arr[i] == target:
        return i
    return -1
print(linear_search(arr))
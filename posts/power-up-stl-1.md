---
title: "পাওয়ার আপ STL পর্ব-১"
date: "2020-10-27"
author: "Shakil Mahmud Arafat"
desc: "এই পর্বে আমরা দেখবো ভেক্টর, সেট এবং মাল্টিসেটের খুঁটিনাটি। যারা এখনো বেসিক ক্লিয়ার করোনি তারা আগের পর্ব থেকে এসটিএল এ হাতেখড়ির বিষয়গুলো দেখে আসতে পারো . . ."
tags:
  - STL
  - Contest
  - c++
---

কোড

```cpp
// C++ program to demonstrate iterators

#include <iostream>
#include <vector>
#include <set>
using namespace std;
int main()
{
	// Declaring a vector
	vector<int> v = { 1, 2, 3 };

	// Declaring an iterator
	vector<int>::iterator i;
	
	// Accessing the elements using iterators
	for (i = v.begin(); i != v.end(); ++i){
		cout << *i << " ";
	}

	return 0;
}

```

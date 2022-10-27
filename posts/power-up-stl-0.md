---
title: "পাওয়ার আপ STL পর্ব-০"
date: "2020-10-26"
author: "Shakil Mahmud Arafat"
desc: "এসটিল বা স্ট্যান্ডার্ড টেমপ্লেট লাইব্রেরি নিয়ে জানাশোনার আগে আমাদের কিছু বেসিক ঝালিয়ে নেয়া প্রয়োজন। এই পর্বে আমরা পয়েন্টার, ইটারেটর . . ."
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

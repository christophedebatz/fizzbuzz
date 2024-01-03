# FizzBuzz
This is the easiest and most basic javascript implementation of the famous Fizz Buzz test.

## Stage 1
### Requirements
- Docker

### Installation
- `git clone https://github.com/christophedebatz/fizzbuzz.git && cd fizzbuzz`
- `docker build -t fizzbuzz . && docker run fizzbuzz`

It will execute the Fizz Buzz iterative algorithm at first and then the test suite.
You certainly have noticed that I had not enough time to wrap the `entrypoint.sh` and the docker logic inside a regular `Makefile`.

### Uninstallation

- `docker rm fizzbuzz`

## Stage 2 - big numbers support
### First case - knowing the last pattern
At first, we consider we want to guess whether the requested number will give us some "Fizz" or some "Buzz" or even some "FizzBuzz" value. Indeed, here we are not interested by the huge log of values between 1 and our big number.
- We can observe that we have a repeated pattern ever y 15 numbers like for instance between 1 and 15 then between 16 and 30 etc.

From 1 to 15
```
1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz
```

From 16 to 30
```
16
17
Fizz
19
Buzz
Fizz
22
23
Fizz
Buzz
26
Fizz
28
29
FizzBuzz
```
So to guess the value for a big number, we can compute its modulo (%) with 15:
- If the modulo is greater than 0 then we subtract the value of the modulo to our number until the modulo is 0

Finally, we start from the nearest modulo-0 number. From here, we only have to compute 15 integers to find the value of our original number.

**Real example:**
> - Big number is equal to **87,645,833,620,383,629,200,361,111**.
> - We find the 15-modulo => 87,645,833,620,383,629,200,361,111 % 15 = 13.
> - So 13 > 0, we then remove 13 to our bug number, so it becomes 87,645,833,620,383,629,200,361,098 after subtraction.
> - Finally, we run our algorithm from this value to this value plus 15 (included) and we can display the last suite and finally discover the value of our big number.

### Second case - Display all patterns
If we really want to be aware of all patterns from 1 until our big number, the only way we have is to pre-calculate all values for each number of the suite and store this dataset into some key-value database for instance. Then we will need to iterate over this dataset to display results (why not with some "infinite" scroll) to the end user. The pre-computing of all number's values can be dispatched into different non conflicting-ranges and pushed into some non-centralized computing grid (like a Kafka cluster) or pushed into local threads (according to the cores count of the machine CPU we are using) to be then computed and finally merged again to find the whole result.

Next to that, it is important to note that some algorithms seems to be a bit more optimized that our naive one. For example this: https://news.ycombinator.com/item?id=29039017

Another algorithm is based on the recurrent pattern's chunks principle. Look at this on Youtube (https://www.youtube.com/watch?v=w3qjHAKKTcY) on which the interviewer guy asks the candidate the same question as our stage 2. And the candidate take an example with an hexadecimal big number that he splits from a given regex. After that, he requests all buckets of the splitting (here, the size of the chunks list is proportional to the size of our big number and the size of the regex splitting). Then, he builds a dataset of recurrent patterns (see Stage 3) and finally he picks into the dataset according to the chunk*.

## Stage 3 - non-branching algorithm
An interesting way to avoid conditions in our code is to index all different values that we can meet for each number of the loop. So we can build some matrix with our 15-length' pattern that cover all our cases.
Once the matrix exists, we loop over each number of our range and then select the associated value of our current number with our 15-modulo operation result.
We can note that this type of indexed-pattern set can also be used as a lightweight version of our naive algorithm and offers a clean way to reduce the process time. Then it can be a valid answer to the "stage 2" discussion.

Also note that some language like Python offers a lot of convenient methods to avoid loop or ternaries operations that javascript does not support.
A non-tested example has been released on Github here https://gist.github.com/kayleg/bded4dc471bb44d598d0*.

(*) these two solutions have been tested in javascript but didn't give much satisfaction.


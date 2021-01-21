---
layout: post
title:  "Automated Job Performing Queue System"
date:   2017-11-14
description: "A Python exercise to implement a job queue"
lang: "en"
author: "Mukul Taneja"
url: https://medium.com/@mukultaneja/automated-job-performing-queue-system-using-python-a7e94e4e3526
---
#### Automated Job Performing Queue System using Python

I love Python language, its freestyle of coding encourages myself to write solutions to many real time problems. I have been using Python on a daily basis from past 2 years now. I mostly work on tornado framework professionally to build web applications but I am also fascinated to write command line applications using Python as well.

Today, I am going to share one of my coding assignment from Amazon Code Contest in which I have been asked to write an automated job performing queue system for a warehouse management.

##### Problem Statement:
Create an Automated Job Performing Queue System based on jobs priority and employees skills. Employees were given with their skills and Jobs were given with skills to be used to finish them along with their priorities and time to finish as inputs using STDIN. Points which should be taken care were, 

I should maintain the order of employees in which they were entered into the system while distributing the Jobs.
As, Multiple employees can have similar skills and multiple jobs can be finished using similar skills so an employee should choose a job relevant to his skills and also which have high priority amongst similar ones.

#### Approach:

To solve this problem, I chose to go with synchronised thread system where threads will represent employees available into the system. I used a Queue data structure from Python which helped me to maintain synchronisation between multiple threads, basically I put all the employees for a specific skills into the Queue at the beginning, pull out employees one by one to allocate jobs to them and push back into the Queue once they complete the given job. To show the busyness of the employees I used time.sleep() which says that the particular employee or thread will go to sleep until time to finish attribute for that job gets over.

[Read more..](https://medium.com/@mukultaneja/automated-job-performing-queue-system-using-python-a7e94e4e3526)
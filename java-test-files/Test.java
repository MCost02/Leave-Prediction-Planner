package lpp;

import java.util.Date;

public class Test {
	public static void main(String[] args) {
		Date test = new Date(2001,7,12); 
		Date test1 = new Date();
		Date test2 = new Date(2000, 7, 11);
		Date test3 = new Date(1999,7,14);
		Date sprint3 = new Date(2022, 10, 18);
		Date test4 = new Date(2022, 11, 9);
		
		Instructor chris = new Instructor("Christopher Fong",test);
		Instructor emily = new Instructor("Emily Fong", test);
		Instructor jasmine = new Instructor("Jasmine Fong", test);
		Instructor danny = new Instructor("Danny", test);
		
		danny.addDate(sprint3);
		
		chris.addDate(test);
		chris.addDate(test1);
		chris.addDate(test2);
		chris.addDate(test4);
		//chris.listDates();
		
		emily.addDate(test2);
		emily.addDate(test3);
		
		jasmine.addDate(test);
		
		Calendar cal = new Calendar();
		cal.instructors.add(chris);
		cal.instructors.add(emily);
		cal.instructors.add(jasmine);
		cal.instructors.add(danny);
		cal.updateCalendar();
		cal.display();
		
		//System.out.println(2/3);
	}
}

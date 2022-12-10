package lpp;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Instructor {
	
	String name;
	Date birthday;
	List<Date> importantDates = new ArrayList<>();
	List<Child> Kids = new ArrayList<>();
	
	public Instructor(String name, Date birthday) {
		this.name = name;
		this.birthday = birthday;
	} 
	
	public String getName() {
		return name;
	} 
	public Date getBirthday() {
		return birthday;
	} 
	public void addDate(Date date) {
		importantDates.add(date);
	}
	
	public void listDates() {
		for (int i = 0; i < importantDates.size(); i++) {
			if (i == importantDates.size()-1) {
				System.out.print(importantDates.get(i));
			} else {
				System.out.print(importantDates.get(i) + ", ");
			}
		}
		System.out.println();
	}
	public int numDates() {
		return importantDates.size();
	}
	
}

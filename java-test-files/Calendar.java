package lpp;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Calendar {
	int totalMonths = 12;
	Date currentDay = new Date();
	int month = currentDay.getMonth();
	int year = currentDay.getYear();
	
	List<List<Date>> calendar = new ArrayList<List<Date>>(totalMonths);
	List<List<Integer>> heatMap = new ArrayList<List<Integer>>(totalMonths);
	List<List<Integer>> tempMap = new ArrayList<List<Integer>>(totalMonths);
	
	List<Instructor> instructors = new ArrayList<>();
	
	public static final String COLOR_RESET = "\u001B[0m";
	public static final String COLOR_GREEN = "\u001B[42m";
	public static final String COLOR_YELLOW = "\u001B[43m";
	public static final String COLOR_RED = "\u001B[41m";
	
	public Calendar() {
		int daysInMonth = new Date(year, month+1, 0).getDate();
		int firstDayofMonth = new Date(year, month, 1).getDate();
		 
		for (int m = 0; m < totalMonths; m++) {
			daysInMonth = new Date(year, month+1+m, 0).getDate();
			
			calendar.add(new ArrayList<Date>());
			heatMap.add(new ArrayList<Integer>());
			tempMap.add(new ArrayList<Integer>());
			for (int d = 1; d <= daysInMonth; d++) {
				heatMap.get(m).add(0);
				tempMap.get(m).add(0);
				calendar.get(m).add(new Date(year, month+m, d));
			}
		}
	}
	
	public void display() {
		for (int i = 0; i < totalMonths; i++) { 
			System.out.println();
			System.out.println((calendar.get(i).get(1).getMonth() + 1) + " " + 
		(calendar.get(i).get(0).getYear() + 1900));
			System.out.println("sun mon tue wed thu fri sat");
			
			if (calendar.get(i).get(0).getDay() != 0) {
				for (int j = 0; j < calendar.get(i).get(0).getDay(); j++) {
					System.out.print("[ ]");
				}
			} 
			
			for (int x = 0; x < calendar.get(i).size(); x++) {
				if (calendar.get(i).get(x).getDay() == 0) {
					System.out.println();
				}
				if (instructors.size() <= 2) {
					if (heatMap.get(i).get(x) == instructors.size()) {
						System.out.print(COLOR_RED + "[" + calendar.get(i).get(x).getDate() + "]" + COLOR_RESET);
						//red
					} else if (heatMap.get(i).get(x) == 1) {
						System.out.print(COLOR_YELLOW + "[" + calendar.get(i).get(x).getDate() + "]" + COLOR_RESET);
						//yellow
					} else {
						System.out.print("[" + calendar.get(i).get(x).getDate() + "]");
					}
				} else {
					if (heatMap.get(i).get(x) > (instructors.size()/3)*2) {
						System.out.print(COLOR_RED + "[" + calendar.get(i).get(x).getDate() + "]" + COLOR_RESET);
					} else if ((heatMap.get(i).get(x) <= (instructors.size()/3)*2) &&  (heatMap.get(i).get(x) > instructors.size()/3)) {
						System.out.print(COLOR_YELLOW + "[" + calendar.get(i).get(x).getDate() + "]" + COLOR_RESET);
					} else if ((heatMap.get(i).get(x) <= instructors.size()/3) && (heatMap.get(i).get(x) != 0)) {
						System.out.print(COLOR_GREEN + "[" + calendar.get(i).get(x).getDate() + "]" + COLOR_RESET);
					} else {
						System.out.print("[" + calendar.get(i).get(x).getDate() + "]");
					}
				}
			}
		}
	}
	
	public void updateCalendar() {
		
		//implement holidays (remember ppl usually want to take longer breaks for holidays)
		for (int i = 0; i < instructors.size(); i++) {

			for (int x = 0; x < instructors.get(i).numDates(); x++) {
				
				//this is to figure out which months are which relative to the current month
				int tempMonth = instructors.get(i).importantDates.get(x).getMonth();
				int tempDay = instructors.get(i).importantDates.get(x).getDate()-1;
				int monthNav = 0;
				if (tempMonth - month < 0) {
					monthNav = 12 + (tempMonth - month);
				} else {
					monthNav = tempMonth - month;
				}
				
				int potentialDays = 0;
				
				if (calendar.get(monthNav).get(tempDay).getDay() <= 1) {
					potentialDays = 3;
					for (int m = 0; m < potentialDays; m++) {
						if (tempMap.get(monthNav).get(tempDay-1+m) == 0) {
							tempMap.get(monthNav).set(tempDay-1+m, 1);
						}
					}    
					
				} else if (calendar.get(monthNav).get(tempDay).getDay() >= 2 &&   calendar.get(monthNav).get(tempDay).getDay() <= 4) { 
					if (tempMap.get(monthNav).get(tempDay) == 0) {
						tempMap.get(monthNav).set(tempDay, 1);
					}
				} else if (calendar.get(monthNav).get(tempDay).getDay() == 5) {
					potentialDays = 3;
					for (int m = 0; m < potentialDays; m++) {
						if (tempMap.get(monthNav).get(tempDay+m) == 0) {
							tempMap.get(monthNav).set(tempDay+m, 1);
							System.out.println(tempDay+m);
						}
					}
				} else {
					potentialDays = 2;
					for (int m = 0; m < potentialDays; m++) {
						if (tempMap.get(monthNav).get(tempDay+m) == 0) {
							tempMap.get(monthNav).set(tempDay+m, 1);
						}
					}
				}
				

			}
			//think of a better way to add to heat map and zero all numbers
			//maybe use addedDates list and division 
			for (int j = 0; j < totalMonths; j++) {
				for (int k = 0; k < heatMap.get(j).size(); k++) {
					heatMap.get(j).set(k, heatMap.get(j).get(k) + tempMap.get(j).get(k));
					tempMap.get(j).set(k, 0);
					
				}
			}
		}
	}
}
	
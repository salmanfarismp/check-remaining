from datetime import datetime, timedelta

def calculate_timer_end(current_time):
    # Get the current date
    current_date = datetime.now().date()
    
    # Combine the current date with the provided time
    current_datetime = datetime.combine(current_date, datetime.strptime(current_time, '%H:%M:%S').time())

    # Add 8 hours to the current time
    timer_end = current_datetime + timedelta(hours=8)

    return timer_end.strftime('%Y-%m-%d %H:%M:%S')

# Example usage
current_timer_time = '14:15:00'
timer_end_time = calculate_timer_end(current_timer_time)
print("Timer will hit 8 hours at:", timer_end_time)

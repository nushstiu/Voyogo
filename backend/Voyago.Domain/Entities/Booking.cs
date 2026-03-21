namespace Voyago.Domain.Entities;

public class Booking
{
    public int Id { get; set; }
    public int TripId { get; set; }
    public string UserName { get; set; } = string.Empty;
    public DateTime BookingDate { get; set; }
    public int NumberOfPeople { get; set; }
    public decimal TotalPrice { get; set; }
    public string Status { get; set; } = string.Empty;
}
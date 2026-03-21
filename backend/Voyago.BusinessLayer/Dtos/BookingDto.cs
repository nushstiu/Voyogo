namespace Voyago.BusinessLayer.Dtos;

public class BookingDto
{
    public int TripId { get; set; }
    public string UserName { get; set; } = string.Empty;
    public DateTime BookingDate { get; set; }
    public int NumberOfPeople { get; set; }
    public decimal TotalPrice { get; set; }
    public string Status { get; set; } = string.Empty;
}
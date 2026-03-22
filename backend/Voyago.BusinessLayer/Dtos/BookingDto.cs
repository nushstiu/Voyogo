namespace Voyago.BusinessLayer.Dtos;

public class BookingDto
{
    public Guid UserId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Surname { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Destination { get; set; } = string.Empty;
    public Guid? TourId { get; set; }
    public string? TourName { get; set; }
    public DateTime BookingDate { get; set; }
    public string Duration { get; set; } = string.Empty;
    public string Status { get; set; } = "pending";
    public string? Notes { get; set; }
    public string? AdminNotes { get; set; }
}

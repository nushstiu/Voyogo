namespace Voyago.BusinessLayer.Dtos;

public class TripDto
{
    public string Title { get; set; } = string.Empty;
    public int DestinationId { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public decimal Price { get; set; }
    public int AvailableSpots { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
}
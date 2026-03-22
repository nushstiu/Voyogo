using Voyago.Domain.Enums;

namespace Voyago.BusinessLayer.Dtos;

public class TourDto
{
    public string Location { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Price { get; set; } = string.Empty;
    public string Days { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Image { get; set; } = string.Empty;
    public int DestinationId { get; set; }
    public TourStatus Status { get; set; }
}

namespace Voyago.BusinessLayer.Dtos;

public class DestinationDto
{
    public string Name { get; set; } = string.Empty;
    public int Packages { get; set; }
    public string PriceRange { get; set; } = string.Empty;
    public string Image { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}

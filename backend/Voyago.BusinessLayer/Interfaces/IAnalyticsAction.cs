namespace Voyago.BusinessLayer.Interfaces;

public interface IAnalyticsAction
{
    object GetOverview();
    List<object> GetBookingTrends();
    List<object> GetPopularDestinations();
    List<object> GetRevenueByDestination();
    List<object> GetBookingStatusDistribution();
}
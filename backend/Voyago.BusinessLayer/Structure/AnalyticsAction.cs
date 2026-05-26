using Voyago.BusinessLayer.Core;
using Voyago.BusinessLayer.Interfaces;

namespace Voyago.BusinessLayer.Structure;

public class AnalyticsAction : AnalyticsActions, IAnalyticsAction
{
    public object GetOverview()                      => ExecuteGetOverview();
    public List<object> GetBookingTrends()           => ExecuteGetBookingTrends();
    public List<object> GetPopularDestinations()     => ExecuteGetPopularDestinations();
    public List<object> GetRevenueByDestination()    => ExecuteGetRevenueByDestination();
    public List<object> GetBookingStatusDistribution() => ExecuteGetBookingStatusDistribution();
}
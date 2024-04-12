import 'package:permission_handler/permission_handler.dart';
import 'package:photo_manager/photo_manager.dart';

Future<List<AssetEntity>> getImagesCreatedToday() async {
  if (await Permission.contacts.request().isGranted) {
    // Either the permission was already granted before or the user just granted it.
  }

  // Get today's date and set time to midnight
  DateTime now = DateTime.now();
  DateTime today = DateTime(now.year, now.month, now.day);
  DateTime tomorrow = DateTime(now.year, now.month, now.day + 1);

  // Fetch assets created today
  var filterOption = FilterOptionGroup(
    createTimeCond: DateTimeCond(
      min: today,
      max: tomorrow,
    ),
  );
  List<AssetPathEntity> albums = await PhotoManager.getAssetPathList(
      onlyAll: true, filterOption: filterOption);
  List<AssetEntity> imagesToday = [];

  for (var album in albums) {
    // Fetch all assets within the time range of today
    int albumCount = await album.assetCountAsync;
    final assets = await album.getAssetListRange(
      start: 0,
      end: albumCount,
    );

    // Filter to include only images
    imagesToday.addAll(assets.where((asset) => asset.type == AssetType.image));
  }
  return imagesToday;
}

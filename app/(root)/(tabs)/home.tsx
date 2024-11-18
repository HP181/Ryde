import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link, router } from 'expo-router'
import { useAuth } from "@clerk/clerk-expo";
import { ActivityIndicator, Button, FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { icons, images } from '@/constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import RideCard from '@/Components/RideCard';
import { Ride } from "@/types/type";
import GoogleTextInput from '@/Components/GoogleTextInput';

const Home = () => {
  const { user } = useUser()
  const { signOut } = useAuth()

  const loading = false

  const handleSignOut = () => {
    signOut();
    router.replace("/(auth)/sign-in");
  };

  const recentRides: Ride[] = [
    {
      ride_id: "1",
      origin_address: "Kathmandu, Nepal",
      destination_address: "Pokhara, Nepal",
      origin_latitude: 27.717245,
      origin_longitude: 85.323961,
      destination_latitude: 28.209583,
      destination_longitude: 83.985567,
      ride_time: 391,
      fare_price: 19500.00,
      payment_status: "paid",
      driver_id: 2,
      user_id: "1",
      created_at: "2024-08-12 05:19:20.620007",
      driver: {
        // driver_id: "2",
        first_name: "David",
        last_name: "Brown",
        // profile_image_url: "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/",
        // car_image_url: "https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/",
        car_seats: 5,
        // rating: "4.60",
      },
    },
    // Add more rides as needed...
  ];

  const handleDestinationPress = () => {}

  return (
    <SafeAreaView className="bg-general-500 flex-1">
    <FlatList
      data={recentRides}
      renderItem={({ item }: { item: Ride }) => <RideCard ride={item} />}
      keyExtractor={(item) => item.ride_id}
      contentContainerStyle={{
        paddingBottom: 100,
        paddingHorizontal: 20, // Added consistent horizontal padding
      }}
      keyboardShouldPersistTaps="handled"
    ListEmptyComponent={() => (
        <View className="flex flex-col items-center justify-center">
          {!loading ? (
            <>
              <Image
                source={images.noResult}
                className="w-40 h-40"
                alt="No recent rides found"
                resizeMode="contain"
              />
              <Text className="text-sm">No recent rides found</Text>
            </>
          ) : (
            <ActivityIndicator size="small" color="#000" />
          )}
        </View>
      )}

      ListHeaderComponent={
        <>
          <View className="flex flex-row items-center justify-between my-5">
            <Text className="text-2xl font-JakartaExtraBold">
              Welcome {user?.firstName || user?.emailAddresses[0].emailAddress}👋
            </Text>
            <TouchableOpacity
              onPress={handleSignOut}
              className="justify-center items-center w-10 h-10 rounded-full bg-white"
            >
              <Image source={icons.out} className="w-4 h-4" />
            </TouchableOpacity>
          </View>

          <GoogleTextInput
            icon={icons.search}
            containerStyle="bg-white shadow-md shadow-neutral-300"
            handlePress={handleDestinationPress}
          />

          <>
            <Text className="text-xl font-JakartaBold mt-5 mb-3">
              Your current location
            </Text>
            <View className="flex flex-row items-center bg-transparent h-[300px]">
              {/* <Map /> */}
            </View>
          </>

          <Text className="text-xl font-JakartaBold mt-5 mb-3">
            Recent Rides
          </Text>
        </>
      }
    />
  </SafeAreaView>
  )
}

export default Home;
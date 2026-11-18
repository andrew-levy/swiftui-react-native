require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "SwiftUIReactNative"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => min_ios_version_supported }
  s.source       = { :git => "https://github.com/andrew-levy/swiftui-react-native.git", :tag => "v#{s.version}" }

  s.source_files = [
    # runtime/cpp/     Shared C++: state, measurement, layout, shadow nodes, component descriptors.
    "runtime/cpp/**/*.{h,hpp,cpp}",
    # runtime/apple/Fabric, Generated, Utils   Objective-C++ Fabric component views.
    "runtime/apple/**/*.{h,m,mm}",
    # runtime/apple/Hosting, Runtime, Generated, Modules   Swift / SwiftUI and Nitro implementations.
    "runtime/apple/**/*.swift",
  ]

  # Only the Swift <-> Objective-C++ contract is public: Swift cannot import headers that
  # pull in React Native's C++ types.
  s.public_header_files = ["runtime/apple/SwiftUIReactNative.h", "runtime/apple/Protocols/SUIHostView.h"]
  s.private_header_files = ["runtime/cpp/**/*.h", "runtime/apple/Fabric/**/*.h", "runtime/apple/Events/**/*.h", "runtime/apple/Utils/**/*.h"]

  s.pod_target_xcconfig = {
    "HEADER_SEARCH_PATHS" => "\"$(PODS_TARGET_SRCROOT)/runtime/cpp\"",
  }

  load "nitrogen/generated/ios/SwiftUIReactNative+autolinking.rb"
  add_nitrogen_files(s)

  install_modules_dependencies(s)
end

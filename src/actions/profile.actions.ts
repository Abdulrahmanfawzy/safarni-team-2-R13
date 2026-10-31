// "use server";

// import {
//   getProfileApi,
//   updateProfileApi,
//   getProfileBookingsApi,
//   updateAccountSecurityApi,
//   deleteAccountApi,
//   updateLanguageApi,
// } from "@/api/profile.api";

// // 1. Action جلب وتعديل المعلومات الشخصية (info)
// export async function getProfileAction(token: string) {
//   try {
//     const res = await getProfileApi(token);
//     return { success: true, user: res.data || res };
//   } catch (error) {
//     console.error("Error in getProfileAction:", error);
//     return { success: false, error: "فشل في جلب البيانات الشخصية" };
//   }
// }

// export async function updateProfileAction(token: string, formData: Record<string, unknown>) {
//   try {
//     const res = await updateProfileApi(token, formData);
//     return { success: true, user: res.data || res };
//   } catch (error) {
//     console.error("Error in updateProfileAction:", error);
//     return { success: false, error: "فشل في تحديث البيانات الشخصية" };
//   }
// }

// // 2. Action قسم الحجوزات (booking)
// export async function getBookingsAction(token: string) {
//   try {
//     const res = await getProfileBookingsApi(token);
//     return { success: true, bookings: res.data || [] };
//   } catch (error) {
//     console.error("Error in getBookingsAction:", error);
//     return { success: false, error: "فشل في جلب قائمة الحجوزات" };
//   }
// }

// // 3. Action قسم أمان الحساب وإعداداته (account - البصمة، Face ID، وحذف الحساب)
// export async function updateSecurityAction(
//   token: string,
//   securityData: { biometric?: boolean; faceId?: boolean }
// ) {
//   try {
//     const res = await updateAccountSecurityApi(token, securityData);
//     return { success: true, message: res.message || "تم تحديث إعدادات الأمان بنجاح" };
//   } catch (error) {
//     console.error("Error in updateSecurityAction:", error);
//     return { success: false, error: "فشل في تحديث إعدادات الأمان" };
//   }
// }

// export async function deleteAccountAction(token: string) {
//   try {
//     const res = await deleteAccountApi(token);
//     return { success: true, message: res.message || "تم حذف الحساب بنجاح" };
//   } catch (error) {
//     console.error("Error in deleteAccountAction:", error);
//     return { success: false, error: "فشل في حذف الحساب" };
//   }
// }

// // 4. Action تغيير اللغة (language)
// export async function updateLanguageAction(token: string, lang: string) {
//   try {
//     const res = await updateLanguageApi(token, lang);
//     return { success: true, language: lang, message: res.message };
//   } catch (error) {
//     console.error("Error in updateLanguageAction:", error);
//     return { success: false, error: "فشل في تحديث لغة التطبيق" };
//   }
// }
